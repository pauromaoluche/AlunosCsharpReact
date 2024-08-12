import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";
import logoCadastro from "../../assets/cadastro.png";
import { Link, useNavigate } from "react-router-dom";
import { FiXCircle, FiEdit, FiUserX } from "react-icons/fi";

export default function Alunos() {
  const [nome, setNome] = useState("");
  const [alunos, setAlunos] = useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const [updateData, setUpdateData] = useState(true);

  const history = useNavigate();

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (updateData) {
      api.get("api/alunos", authorization).then((response) => {
        setAlunos(response.data);
      }, token);
      setUpdateData(false);
    }
  });

  async function logout() {
    try {
      localStorage.clear();
      localStorage.setItem("token", "");
      authorization.headers = "";
      history("/");
    } catch (err) {
      alert("Não foi possivel fazer o logout" + err);
    }
  }

  return (
    <div className="aluno-container">
      <header>
        <img src={logoCadastro} alt="Cadastro" />
        <span>
          Bem vindo, <b>Pauluci</b>{" "}
        </span>
        <Link className="button" to="aluno/novo/0">
          Novo aluno
        </Link>
        <button onClick={logout} type="button">
          <FiXCircle size={35} color="#17202a" />
        </button>
      </header>
      <form>
        <input type="text" placeholder="Nome" />
        <button type="button" className="button">
          Filtrar aluno por nome (Parcial)
        </button>
      </form>
      <h1>Relação de alunos</h1>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            <b>Nome:</b>
            {aluno.nome}
            <br />
            <br />
            <b>Email:</b>
            {aluno.email}
            <br />
            <br />
            <b>Idade:</b>
            {aluno.idade}
            <br />
            <br />
            <button type="button">
              <FiEdit size="25" color="#14202a" />
            </button>
            <button type="button">
              <FiUserX size="25" color="#17202a" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
