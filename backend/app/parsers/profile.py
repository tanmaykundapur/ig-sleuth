import base64
from pathlib import Path
from ..models.profile import ProfileInfo

def encode_profile_picture(path: Path) -> str:
    image_bytes = path.read_bytes()
    encoded = base64.b64encode(image_bytes).decode("utf-8")
    return f"data:image/jpeg;base64,{encoded}"

def parse_profile(raw_profile: list[dict]) -> ProfileInfo:
    profile_user = raw_profile[0]["profile_user"][0]
    string_data = profile_user["string_map_data"]
    media_data = profile_user.get("media_map_data", {})

    name = string_data.get("Name", {}).get("value")
    username = string_data.get("Username", {}).get("value", "unknown")

    email = None
    profile_picture_relative_path = media_data.get("Profile Photo", {}).get("uri")

    return ProfileInfo(
        name=name,
        username=username,
        email=email,
        profile_picture_url=None,
        profile_picture_relative_path=profile_picture_relative_path,
    )