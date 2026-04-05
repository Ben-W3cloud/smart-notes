from openai import OpenAI
from config.settings import settings

def explain_note(content: str) -> str:
    """
    Uses OpenAI to simplify and explain the given note content.
    """
    client = OpenAI(api_key=settings.openai_api_key)
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that simplifies and explains notes clearly in a concise way."},
            {"role": "user", "content": f"Please explain the following note simply and clearly:\n\n{content}"}
        ],
        max_tokens=200,
        temperature=0.8
    )
    return response.choices[0].message.content.strip()
