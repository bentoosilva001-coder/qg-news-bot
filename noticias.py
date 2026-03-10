import requests
import json
import time

CHAVE_API = '490d15f4796e472c8b8839608a4b684e'

def buscar_cobertura_global():
    noticias_reais = []
    meta_noticias = 100
    termos = 'mundo OR internacional OR economia OR política OR tecnologia OR ciência'
    
    print("Iniciando varredura global máxima do QG NEWS...")
    url = f'https://newsapi.org/v2/everything?q={termos}&language=pt&sortBy=publishedAt&pageSize={meta_noticias}&apiKey={CHAVE_API}'
    
    try:
        resposta = requests.get(url)
        dados_brutos = resposta.json()

        if dados_brutos.get('status') == 'ok':
            artigos = dados_brutos.get('articles', [])
                
            for artigo in artigos:
                if artigo.get('title') and artigo.get('description') and artigo.get('urlToImage') and "[Removed]" not in artigo['title']:
                    
                    titulos_salvos = [n['title'] for n in noticias_reais]
                    if artigo['title'] not in titulos_salvos:
                        noticias_reais.append({
                            "title": artigo['title'],
                            "body": artigo['description'],
                            "url": artigo['url'],
                            "image": artigo['urlToImage'],
                            "data": artigo.get('publishedAt') # Aqui ele pega a data e hora da notícia!
                        })
                        
            with open('dados.json', 'w', encoding='utf-8') as arquivo:
                json.dump(noticias_reais, arquivo, indent=4, ensure_ascii=False)

            print(f"\n✅ SUCESSO! {len(noticias_reais)} notícias de alto nível publicadas e prontas.")
            
        else:
            print(f"Erro da API: {dados_brutos.get('message')}")

    except Exception as erro:
        print(f"Falha na conexão: {erro}")

buscar_cobertura_global()