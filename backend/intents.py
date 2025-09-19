def get_bot_response(message: str) -> str:
    msg = message.lower()

    if "promoção" in msg or "promoções" in msg:
        return "Hoje temos promoções em arroz, feijão e leite!"
    elif "vaga" in msg or "trabalhar" in msg:
        return "As vagas podem ser consultadas diretamente no setor de RH."
    elif "horário" in msg or "abre" in msg or "funciona" in msg:
        return "Estamos abertos de segunda a sábado das 8h às 20h, e domingos das 8h às 14h."
    elif "endereço" in msg or "localização" in msg or "onde fica" in msg:
        return "Nosso supermercado fica na Rua das Palmeiras, nº 123, no centro da cidade."

    elif "entrega" in msg or "delivery" in msg or "frete" in msg:
        return "Fazemos entregas em até 2h para toda a cidade, com taxa de R$ 5,00."

    elif "pagamento" in msg or "formas de pagamento" in msg:
        return "Aceitamos dinheiro, cartão de crédito, débito, Pix e vale-alimentação."

    elif "oferta" in msg or "ofertas" in msg:
        return "Hoje temos ofertas especiais em frutas e verduras fresquinhas!"

    elif "fruta" in msg or "frutas" in msg:
        return "Temos maçã, banana, laranja, uva, mamão e muitas outras frutas da estação."

    elif "carne" in msg or "açougue" in msg:
        return "No açougue temos carne bovina, suína e frango com preços especiais!"

    elif "padaria" in msg or "pão" in msg:
        return "Nossa padaria assa pães fresquinhos a cada hora! Também temos bolos e doces."

    elif "bebida" in msg or "refrigerante" in msg or "suco" in msg:
        return "Temos refrigerantes, sucos naturais, água mineral e até vinhos na seção de bebidas."

    elif "cartão fidelidade" in msg or "fidelidade" in msg or "desconto" in msg:
        return "Com nosso cartão fidelidade você acumula pontos a cada compra e ganha descontos exclusivos."

    elif "estacionamento" in msg or "carro" in msg:
        return "Disponibilizamos estacionamento gratuito para clientes por até 2 horas."

    elif "sacolinha" in msg or "sacola" in msg:
        return "Oferecemos sacolas biodegradáveis e incentivamos o uso de ecobags!"

    elif "fila" in msg or "caixa" in msg:
        return "Temos 10 caixas disponíveis, incluindo 2 exclusivos para clientes com até 15 itens."

    elif "higiene" in msg or "limpeza" in msg:
        return "Na seção de limpeza você encontra detergente, sabão em pó, amaciante, água sanitária e muito mais."

    elif "leite" in msg or "laticínios" in msg:
        return "Temos leite integral, desnatado, sem lactose, além de queijos e iogurtes variados."

    elif "vegetariano" in msg or "vegano" in msg:
        return "Temos opções veganas e vegetarianas, incluindo leites vegetais, hambúrgueres de soja e snacks saudáveis."

    elif "promoção cerveja" in msg or "cerveja" in msg:
        return "Hoje temos promoção na cerveja: leve 12 e pague 10!"

    elif "telefone" in msg or "contato" in msg:
        return "Você pode falar conosco pelo telefone (11) 99999-9999 ou pelo WhatsApp no mesmo número."
    else:
        return "Desculpe, não entendi. Pode reformular sua pergunta?"
