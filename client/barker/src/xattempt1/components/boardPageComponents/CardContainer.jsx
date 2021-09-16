import React from "react";
import styled from "styled-components";
import Card from "./Card";
import NewCardButton from "./NewCardButton";
import ProjectTitle from "./ProjectTitle";

const CardContainerStyled = styled.div`
  min-width: 245px;
  height: 100%;
  padding-bottom: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0px 10px;
`;

export default function CardContainer({ project }) {
  return (
    <CardContainerStyled>
      <ProjectTitle title={project.title} projecttId={project._id} />
      <div>
        {project.cards.map((card, index) => (
          <Card card={card} key={card._id} index={card.position} />
        ))}
      </div>
      <NewCardButton projectId={project._id} />
    </CardContainerStyled>
  );
}