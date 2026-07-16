from pathlib import Path
import json
from ..parsers.profile import encode_profile_picture

def load_category_files(export_root: Path, filename_pattern: str) -> list[dict]:
    res = []
    matching_files = list(export_root.rglob(filename_pattern))

    for file in matching_files:
        file_data = json.loads(file.read_text(encoding="utf-8"))
        res.append(file_data)

    return res

def load_profile_picture(export_root: Path) -> str | None:
    matches = list(export_root.rglob("18130264597577607.jpg"))  # or a pattern matching whatever the real filename structure is
    if not matches:
        return None
    return encode_profile_picture(matches[0])  # matches[0] is a file, not a directory
