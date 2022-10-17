import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainner = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px;
    border-radius: 8px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width = 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #008080;
    color: white;
    height: 40px;
    margin: 0 auto;
    box-shadow: 0 2px 1px #333;
`;

const Form = ( { getUsers, onEdit, setOnEdit } ) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.telefone.value = onEdit.telefone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if(
            !user.nome.value ||
            !user.email.value ||
            !user.telefone.value ||
            !user.data_nascimento.value
        ) {
            return toast.warn('Preencha todos os campos!');
        }

        if(onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    telefone: user.telefone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800/", {
                    nome: user.nome.value,
                    email: user.email.value,
                    telefone: user.telefone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        user.nome.value = "";
        user.email.value = "";
        user.telefone.value = "";
        user.data_nascimento.value = "";

        setOnEdit(null);
        getUsers();
    };

    return(
        <FormContainner ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                
                <Input name="nome" placeholder="Seu Nome:"/>
            </InputArea>

            <InputArea>
               
                <Input name="telefone" placeholder="Nº Telefone:" />
            </InputArea>

            <InputArea>
                
                <Input name="email" type="email" placeholder="Email:"/>
            </InputArea>

            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date" />
            </InputArea>

            <Button type="submit">Salvar</Button>
        </FormContainner>
    );
};

export default Form;