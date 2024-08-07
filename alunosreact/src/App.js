import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logoCadastro from "./assets/cadastro.png";

function App() {
  const baseUrl = "http://localhost:5244/api/alunos";

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: "",
    nome: "",
    email: "",
    idade: "",
  });

  const selecionarAluno = (aluno, opcao) => {
    setAlunoSelecionado(aluno);
    opcao === "editar" ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  };

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  };

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    });
    console.log(alunoSelecionado);
  };

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

  const pedidoPost = async () => {
    delete alunoSelecionado.id;
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    await axios
      .post(baseUrl, alunoSelecionado)
      .then((response) => {
        setData(data.concat(response.data));
        setUpdateData(true);
        abrirFecharModalIncluir();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPut = async () => {
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    await axios
      .put(baseUrl + "/" + alunoSelecionado.id, alunoSelecionado)
      .then((response) => {
        var resposta = response.data;
        var dadosAuxiliar = data;
        dadosAuxiliar.map((aluno) => {
          if (aluno.id === alunoSelecionado.id) {
            aluno.nome = resposta.nome;
            aluno.email = resposta.email;
            aluno.idade = resposta.idaed;
          }
        });
        setUpdateData(true);
        abrirFecharModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoDelete = async () => {
    await axios
      .delete(baseUrl + "/" + alunoSelecionado.id)
      .then((response) => {
        setData(data.filter((aluno) => aluno.id !== response.data));
        setUpdateData(true);
        abrirFecharModalExcluir();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (updateData) {
      pedidosGet();
      setUpdateData(false);
    }
  },[updateData]);

  return (
    <div className="App container">
      <br />
      <h3>Cadastro de alunos</h3>
      <header>
        <img src={logoCadastro} alt="cadastro" />
        <button
          className="btn btn-success"
          onClick={() => abrirFecharModalIncluir()}
        >
          Incluir novo aluno
        </button>
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
                <button
                  className="btn btn-primary"
                  onClick={() => selecionarAluno(aluno, "editar")}
                >
                  Editar
                </button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => selecionarAluno(aluno, "excluir")}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Adicionar Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label for="nome">Nome: </label>
            <input
              id="nome"
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
            />
            <br />
            <label for="email">Email: </label>
            <input
              id="email"
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
            />
            <br />
            <label for="idade">Idade: </label>
            <input
              id="idade"
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>
            Adicionar
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalIncluir()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID:</label>
            <br />
            <input
              type="text"
              className="form-control"
              readOnly
              value={alunoSelecionado && alunoSelecionado.id}
            />
            <br />
            <label for="nome">Nome: </label>
            <input
              id="nome"
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.nome}
            />
            <br />
            <label for="email">Email: </label>
            <input
              id="email"
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.email}
            />
            <br />
            <label for="idade">Idade: </label>
            <input
              id="idade"
              type="text"
              className="form-control"
              name="idade"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.idade}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPut()}>
            Editar
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão deste(a) Aluno(a):{" "}
          {alunoSelecionado && alunoSelecionado.nome} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => pedidoDelete()}>
            Sim
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirFecharModalExcluir()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
