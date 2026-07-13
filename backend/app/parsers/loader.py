from pathlib import Path
import json

def load_category_files(export_root: Path, filename_pattern: str) -> list[dict]:
    res = []
    matching_files = list(export_root.rglob(filename_pattern))
    
    for file in matching_files:
        file_data = json.loads(file.read_text(encoding="utf-8"))
        
        if isinstance(file_data, list):
            res.extend(file_data)
            
        elif isinstance(file_data, dict):
            for key, value in file_data.items():
                # Make sure it's a list AND it actually contains the data dicts we want
                if isinstance(value, list) and len(value) > 0:
                    # Double check the first item inside is a dict with 'string_list_data'
                    if isinstance(value[0], dict) and "string_list_data" in value[0]:
                        res.extend(value)
    
    return res