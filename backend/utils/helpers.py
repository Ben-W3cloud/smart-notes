def trim_text(text: str, max_length: int = 150) -> str:
    """
    Utility function to safely trim text to a maximum length, 
    adding an ellipsis if it was trimmed.
    """
    if not text:
        return ""
    if len(text) > max_length:
        return text[:max_length].rstrip() + "..."
    return text

def normalize_title(title: str) -> str:
    """
    Strips leading/trailing whitespace and normalizes internal spaces.
    """
    if not title:
        return ""
    return " ".join(title.split()).title()
