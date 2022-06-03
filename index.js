const Redux = require('redux');
const {createStore, combineReducers} = Redux

const criarContrato = (nome, valor) => {
    return {
        type: "CRIAR_CONTRATO",
        payload: {
            nome, 
            valor
        } 
    }
}

function cancelarContrato(nome) {
    return {
        type: "CANCELAR_CONTRATO",
        payload: {
            nome
        }
    }
}

const solicitacarCashback = (nome, valor) => {
    return {
        type: "SOLICITAR_CASHBACK",
        payload: {
            nome,
            valor
        }
    }
}

const historicoDePedidosCashbackReducer = (historicoDePedidosCashback = [], acao) => {
    return acao.type === "SOLICITAR_CASHBACK" ? [...historicoDePedidosCashback, acao.payload] : historicoDePedidosCashback;
}

function caixaReducer(valorEmCaixa = 0, acao) {
    if (acao.type === "SOLICITAR_CASHBACK") {
        return valorEmCaixa -= acao.payload.valor;
    } else if (acao.type === "CRIAR_CONTRATO") {
        return valorEmCaixa += acao.payload.valor;
    }
    return valorEmCaixa;
}

const contratosReducer = (contratos = [], acao) => {
    if (acao.type === "CRIAR_CONTRATO") {
        return [...contratos, acao.payload]
    } else if (acao.type === "CANCELAR_CONTRATO") {
        return contratos.filter(contrato => contrato.nome !== acao.payload.nome);
    }
    return contratos;
}

const todosOsReducers = combineReducers({
    historicoCashback: historicoDePedidosCashbackReducer,
    caixa: caixaReducer,
    contratos: contratosReducer
})

const store = createStore(todosOsReducers)

const sorteiaValor = (nome) => {
    let numero = (Math.floor(Math.random() * 20)) + 10
    return solicitacarCashback(nome, numero)
}

