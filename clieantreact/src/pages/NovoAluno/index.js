import React from "react";
import "./styles.css";
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

export default function NovoAluno() {
  const {alunoId} = useParams();
  return (
    <div className="novo-aluno-container">
      <div className="content">
        <section className="form">
          <FiUserPlus size={105} color="#17202a" />
          <h1>{alunoId === "0" ? "Incluir Novo Aluno" : "Atualizar Aluno"}</h1>
          <Link className="back-link" to="/alunos">
            <FiCornerDownLeft size={25} color="#17202a" />
            Retornar
          </Link>
        </section>
        <form action="">
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="Email" />
          <input type="number" placeholder="Idade" />
          <button className="button" type="submit">
          {alunoId === "0" ? "Incluir" : "Atualizar"}
          </button>
        </form>
      </div>
    </div>
  );
}
