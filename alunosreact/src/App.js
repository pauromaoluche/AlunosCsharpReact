import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logoCadastro from "./assets/cadastro.png";

function App() {
  const baseUrl = "http://localhost:5244/api/alunos";

  const [data, setData] = useState([]);
  const pedidosGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    pedidosGet();
  }, []);

  return (
    <div className="App">
      <br />
      <h3>Cadastro de alunos</h3>
      <header>
        <img src={logoCadastro} alt="cadastro" />
        <button className="btn btn-success">Incluir novo aluno</button>
      </header>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Idade</th>
            <th scope="col">Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((aluno) => (
            <tr key={aluno.id}>
              <th>{aluno.id}</th>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className="btn btn-primary">Editar</button>{" "}
                <button className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
