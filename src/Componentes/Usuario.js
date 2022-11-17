import axios from "axios"
import { useEffect, useState } from "react"

export const Usuario = (props) => {

    const [usuario, setUsuario] = useState({})
    const [novoNome, setNovoNome] = useState("")
    const [novoEmail, setNovoEmail] = useState("")

    const editarUsuario = () => {
        const body = {
            name:novoNome,
            email: novoEmail
          }

        axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, body, {
            headers: {
                Authorization: "mariana-trancoso-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta)
            setNovoNome("")
            setNovoEmail("")
            pegarUsuarioPeloId()
            
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    const pegarUsuarioPeloId = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, {
            headers: {
                Authorization: "mariana-trancoso-ammal"
            }
        })
        .then((resposta) => {
            setUsuario(resposta.data)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    useEffect(() => {
        pegarUsuarioPeloId()
    }, 
    [])

    const deletarUsuario = () => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, {
            headers: {
                Authorization: "mariana-trancoso-ammal"
            }
        })
        .then((resposta) => {
            alert("usuario deletado com sucesso!")
            props.pegarUsuarios()
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    return (
        <>
            <p>{usuario.name}</p>
            <p>{usuario.email}</p>
            <input 
                placeholder="novo nome"
                value={novoNome}
                onChange={(e) =>setNovoNome(e.target.value) }/>
            <input
                placeholder="novo email"
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}/>
            <button onClick={editarUsuario}>Edita Usuário</button>
            <button onClick={deletarUsuario}>excluir usuário</button>
        </>
    )
        
}