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
            engine="text-davinci-003",  # Cambiar a "text-davinci-003" si estás en GPT-4
            prompt=user_message,
            max_tokens=50
        )
        bot_message = response.choices[0].text.strip()
        return JsonResponse({'message': bot_message})