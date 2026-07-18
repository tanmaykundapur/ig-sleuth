from pydantic import BaseModel

class ProfileInfo(BaseModel):
    name: str | None
    username: str
    email: str | None
    profile_picture_url: str | None
    profile_picture_relative_path: str | None = None