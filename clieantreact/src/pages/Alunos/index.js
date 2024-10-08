import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../../services/api";
import logoCadastro from "../../assets/cadastro.png";
import { Link, useNavigate } from "react-router-dom";
import { FiXCircle, FiEdit, FiUserX } from "react-icons/fi";

export default function Alunos() {
  //filtrar dados
  const [searchInput, setSearchInput] = useState([]);
  const [filtro, setFiltro] = useState([]);

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

  const searchAlunos = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const dadosFiltrados = alunos.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(String(searchInput).toLowerCase());
      });
      setFiltro(dadosFiltrados);
    } else {
      setFiltro(alunos);
    }
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

  async function editAluno(id) {
    try {
      history(`aluno/novo/${id}`);
    } catch (error) {
      alert("Não foi possivel editar o eluno");
    }
  }
  async function deleteAluno(id) {
    try {
      if (window.confirm("Deseja deletar o aluno de id = " + id + " ?")) {
        await api.delete(`api/alunos/${id}`, authorization);
        setAlunos(alunos.filter((aluno) => aluno.id !== id));
      }
    } catch (error) {
      alert("Não foi possível excluir o aluno");
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
        <input
          type="text"
          placeholder="Filtrar por nome"
          onChange={(e) => searchAlunos(e.target.value)}
        />
      </form>
      <h1>Relação de alunos</h1>
      {searchInput.length > 1 ? (
        <ul>
          {filtro.map((aluno) => (
            <li key={aluno.id}>
              <b>Nome: </b>
              {aluno.nome}
              <br />
              <br />
              <b>Email: </b>
              {aluno.email}
              <br />
              <br />
              <b>Idade: </b>
              {aluno.idade}
              <br />
              <br />

              <button onClick={() => editAluno(aluno.id)} type="button">
                <FiEdit size="25" color="#17202a" />
              </button>

              <button type="button" onClick={() => deleteAluno(aluno.id)}>
                <FiUserX size="25" color="#17202a" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {alunos.map((aluno) => (
            <li key={aluno.id}>
              <b>Nome: </b>
              {aluno.nome}
              <br />
              <br />
              <b>Email: </b>
              {aluno.email}
              <br />
              <br />
              <b>Idade: </b>
              {aluno.idade}
              <br />
              <br />

              <button onClick={() => editAluno(aluno.id)} type="button">
                <FiEdit size="25" color="#17202a" />
              </button>

              <button type="button" onClick={() => deleteAluno(aluno.id)}>
                <FiUserX size="25" color="#17202a" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
