import base64
from pathlib import Path
from ..models.profile import ProfileInfo

def encode_profile_picture(path: Path) -> str:
    image_bytes = path.read_bytes()
    encoded = base64.b64encode(image_bytes).decode("utf-8")
    return f"data:image/jpeg;base64,{encoded}"

def parse_profile(raw_profile: list[dict]) -> ProfileInfo:
    data = raw_profile[0]["profile_user"][0]["string_map_data"]
    name = data["Name"]["value"]
    username = data["Username"]["value"]
    email = None
    profile_picture_url = None
    
    return ProfileInfo(name=name, username=username, email=email, profile_picture_url=profile_picture_url)