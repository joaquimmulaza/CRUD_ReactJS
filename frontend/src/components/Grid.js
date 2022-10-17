import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
    font-weight: 600;
    color: #00a7e4;
`

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Tbody = styled.tbody``;
export const Thead = styled.thead``;
export const Tr = styled.tr``;

export const Td = styled.td`

    cursor: pointer;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
    color: #8B7B8B;
    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none;"}
    }
`

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
    color: #333;
    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none;"}
    }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    }

    return (
        <>
            <Container>
                <Title>Usuários Cadastrados</Title>
            </Container>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th onlyWeb>Telefone</Th>
                    </Tr>
                    <Tr></Tr>
                    <Tr></Tr>
                </Thead>
                <Tbody>
                    {users.map((item, i) => (
                        <Tr key={i}>
                            <Td width="30%">{item.nome}</Td>
                            <Td width="30%">{item.email}</Td>
                            <Td width="20%" onlyWeb>{item.telefone}</Td>
                            <Td alignCenter width="5%">
                                <FaEdit onClick={() => handleEdit(item)}/>
                            </Td>
                            <Td alignCenter width="5%">
                                <FaTrash onClick={() => handleDelete(item.id)}/>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
};

export default Grid;