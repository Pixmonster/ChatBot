from django.shortcuts import render
from django.http import JsonResponse
import openai

def index(request):
    return render(request, 'index.html')

def openai_chat(request):
    if request.method == 'POST':
        user_message = request.POST.get('message', '')
        openai.api_key = "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"
        response = openai.Completion.create(
            engine="gpt-3.5-turbo",  # Cambiar a "text-davinci-003" si estás en GPT-4
            prompt=user_message,
            max_tokens=50
        )
        bot_message = response.choices[0].text.strip()
        return JsonResponse({'message': bot_message})


