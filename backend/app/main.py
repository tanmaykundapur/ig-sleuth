import os
import json, tempfile, zipfile
from pathlib import Path
from .parsers.loader import load_category_files, load_profile_picture
from .parsers.connections import parse_connections
from .analysis.connections import group_by_username, mutuals, not_following_back, not_following_back_by_you, followed_first, diff_snapshots
from .models.connections import ConnectionsSnapshot, Relationship, RelationshipType, ConnectionsDiff, ConnectionsAnalysisResult
from .models.profile import ProfileInfo
from .models.response import AnalyzeResponse
from .parsers.profile import parse_profile
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler) # type: ignore[arg-type]

MAX_UPLOAD_SIZE = 500 * 1024 * 1024

allowed_origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:4321").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"Hello": "World"}

def safe_extract(zip_path: Path, extract_to: Path) -> None:
    with zipfile.ZipFile(zip_path) as zf:
        for member in zf.namelist():
            target_path = (extract_to / member).resolve()
            if not str(target_path).startswith(str(extract_to.resolve())):
                raise HTTPException(status_code=400, detail="Unsafe zip contents")
        zf.extractall(extract_to)

# =============================================================================================================
@app.post("/analyze")
@limiter.limit("5/minute")
async def analyze(request: Request, file: UploadFile):
    contents = await file.read()
    
    if len(contents) > MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=400, detail="File too large")
    
    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        zip_path = tmp_path / "upload.zip"
        zip_path.write_bytes(contents)

        try:
            safe_extract(zip_path, tmp_path)
        except zipfile.BadZipFile:
            raise HTTPException(status_code=400, detail="Not a valid zip file")
        
        raw_followers = load_category_files(tmp_path, "followers_*.json")
        raw_following = load_category_files(tmp_path, "following.json")
        raw_close_friends = load_category_files(tmp_path, "close_friends.json")
        raw_blocked = load_category_files(tmp_path, "blocked_profiles.json")
        profile_pic = load_profile_picture(tmp_path)
        raw_profile = load_category_files(tmp_path, "personal_information.json")



    # ProfileInfo(name=name, username=username, email=None, profile_picture_url=profile_pic)

    snapshot = parse_connections(raw_followers, raw_following, raw_close_friends)
    relationships = group_by_username(snapshot)
    mutuals_list = mutuals(relationships)
    not_following_back_list = not_following_back(relationships)
    not_following_back_by_you_list = not_following_back_by_you(relationships)
    followed_first_list = followed_first(relationships)

    # Connections Analysis
    connections_analysis_result = ConnectionsAnalysisResult(
        snapshot=snapshot,
        mutuals=sorted(mutuals_list),
        not_following_back=sorted(not_following_back_list),
        not_followed_back_by_you=sorted(not_following_back_by_you_list),
        followed_first=followed_first_list,
    )

    # Profile Analysis
    profile_analysis_result = parse_profile(raw_profile)
    profile_analysis_result.profile_picture_url = profile_pic

    return AnalyzeResponse(connections=connections_analysis_result, profile=profile_analysis_result)