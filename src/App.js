import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

function App() {
  const [alunos, setalunos] = useState([]);

  const schema = yup
    .object({
      nome: yup.string().required(),
      nota1: yup
        .number()
        .typeError("A nota deve ser digitada em formato de numero!")
        .min(0, "A nota deve ser entre 0 e 10!")
        .max(10, "A nota deve ser entre 0 e 10!")
        .positive()
        .integer()
        .required(),
      nota2: yup
        .number("A nota deve ser digitada em formato de numero!")
        .typeError("A nota deve ser digitada em formato de numero!")

        .min(0, "A nota deve ser entre 0 e 10!")
        .max(10, "A nota deve ser entre 0 e 10!")
        .positive()
        .integer()
        .required(),
      nota3: yup
        .number("A nota deve ser digitada em formato de numero!")
        .typeError("A nota deve ser digitada em formato de numero!")

        .min(0, "A nota deve ser entre 0 e 10!")
        .max(10, "A nota deve ser entre 0 e 10!")
        .positive()
        .integer()
        .required(),
      nota4: yup
        .number("A nota deve ser digitada em formato de numero!")
        .typeError("A nota deve ser digitada em formato de numero!")

        .min(0, "A nota deve ser entre 0 e 10!")
        .max(10, "A nota deve ser entre 0 e 10!")
        .positive()
        .integer()
        .required(),
      nota5: yup
        .number("A nota deve ser digitada em formato de numero!")
        .typeError("A nota deve ser digitada em formato de numero!")

        .min(0, "A nota deve ser entre 0 e 10!")
        .max(10, "A nota deve ser entre 0 e 10!")
        .positive()
        .integer()
        .required(),
      freq: yup
        .number()
        .required()
        .typeError("A frequencia deve ser digitada em formato de numero!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const notas = [data.nota1, data.nota2, data.nota3, data.nota4, data.nota5];
    const media =
      (data.nota1 + data.nota2 + data.nota3 + data.nota4 + data.nota5) / 5;

    const novoAluno = {
      nome: data.nome,
      notas,
      freq: data.freq,
      media,
    };
    setalunos([...alunos, novoAluno]);
    reset();
  };

  const mediaPorDisciplina = (numDisciplina) => {
    const somaNotas = alunos.reduce(
      (acc, aluno) => acc + aluno.notas[numDisciplina],
      0
    );
    return somaNotas / alunos.length;
  };

  const mediaTurma = () => {
    const somaMedias = alunos.reduce((acc, alunos) => acc + alunos.media, 0);
    return somaMedias / alunos.length;
  };

  const abaixoFreq = () => {
    return alunos.filter((alunos) => alunos.freq < 75);
  };

  const acimaMed = (mediaTurma) => {
    return alunos.filter((alunos) => alunos.media > mediaTurma);
  };

  const medturm = mediaTurma();
  const freqB = abaixoFreq();
  const altaMed = acimaMed(medturm);
  const mediasPorDisciplina = [
    mediaPorDisciplina(0),
    mediaPorDisciplina(1),
    mediaPorDisciplina(2),
    mediaPorDisciplina(3),
    mediaPorDisciplina(4),
  ];

  return (
    <div className="mainContainer">
      <h1 className="title">Registro de notas</h1>
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input"
            placeholder="Nome do aluno"
            {...register("nome")}
          />
          <p>{errors.nome?.message}</p>

          <input
            className="input"
            placeholder="Nota da disciplina 1"
            {...register("nota1")}
          />
          <p>{errors.nota1?.message}</p>

          <input
            className="input"
            placeholder="Nota da disciplina 2"
            {...register("nota2")}
          />
          <p>{errors.nota2?.message}</p>

          <input
            className="input"
            placeholder="Nota da disciplina 3"
            {...register("nota3")}
          />
          <p>{errors.nota3?.message}</p>

          <input
            className="input"
            placeholder="Nota da disciplina 4"
            {...register("nota4")}
          />
          <p>{errors.nota4?.message}</p>

          <input
            className="input"
            placeholder="Nota da disciplina 5"
            {...register("nota5")}
          />
          <p>{errors.nota5?.message}</p>

          <input
            className="input"
            placeholder="Frequencia do aluno"
            {...register("freq")}
          />
          <p>{errors.freq?.message}</p>

          <input className="submitButton" type="submit" />
        </form>
      </div>
      <div className="listaAlunos">
        <h2 className="title">Lista de alunos</h2>
        <ul className="lista">
          {alunos.map((alunos, index) => (
            <li key={index}>
              {alunos.nome}: Média: {alunos.media.toFixed(2)} - Frequência:{" "}
              {alunos.freq}%
            </li>
          ))}
        </ul>
      </div>
      <div className="mediaTurma">
        <h2 className="title">Média da Turma</h2>
        <h3 className="">
          {medturm ? medturm.toFixed(2) : "Aguardando digitação das notas"}
        </h3>
      </div>
      <div className="freqMedBaixa">
        <h2 className="title">Alunos com Frequência baixa:</h2>
        <ul className="lista">
          {freqB.length > 0 ? (
            freqB.map((alunos, index) => (
              <li key={index}>
                {alunos.nome}: Média: {alunos.media.toFixed(2)} - Frequência:{" "}
                {alunos.freq}%
              </li>
            ))
          ) : (
            <p>Nenhum aluno com essas condições.</p>
          )}
        </ul>
        <h2 className="title">Alunos com nota acima da media da turma:</h2>
        <ul className="lista">
          {altaMed.length > 0 ? (
            altaMed.map((alunos, index) => (
              <li key={index}>
                {alunos.nome}: Média: {alunos.media.toFixed(2)} - Frequência:{" "}
                {alunos.freq}%
              </li>
            ))
          ) : (
            <p>Nenhum aluno com essas condições.</p>
          )}
        </ul>
      </div>
      <div className="medDisc">
        <h2 className="title">Médias da Turma por Disciplina</h2>
        <p>
          Disciplina 1:{" "}
          {isNaN(mediasPorDisciplina[0].toFixed(2))
            ? "Aguardando a digitação das notas"
            : mediasPorDisciplina[0].toFixed(2)}
        </p>
        <p>
          Disciplina 2:{" "}
          {isNaN(mediasPorDisciplina[1].toFixed(2))
            ? "Aguardando a digitação das notas"
            : mediasPorDisciplina[1].toFixed(2)}
        </p>
        <p>
          Disciplina 3:{" "}
          {isNaN(mediasPorDisciplina[2].toFixed(2))
            ? "Aguardando a digitação das notas"
            : mediasPorDisciplina[2].toFixed(2)}
        </p>
        <p>
          Disciplina 4:{" "}
          {isNaN(mediasPorDisciplina[3].toFixed(2))
            ? "Aguardando a digitação das notas"
            : mediasPorDisciplina[3].toFixed(2)}
        </p>
        <p>
          Disciplina 5:{" "}
          {isNaN(mediasPorDisciplina[4].toFixed(2))
            ? "Aguardando a digitação das notas"
            : mediasPorDisciplina[4].toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default App;
