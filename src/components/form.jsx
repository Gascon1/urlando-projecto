import { useState } from "react";
import styled from "styled-components";
import { Developer } from "./developer";

const MAX_DEVELOPERS = 5;

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  padding: "1em",
  maxWidth: "600px",
});

const StyledInput = styled.input(({ disabled }) => ({
  padding: "0.5em",
  fontSize: "1em",
  background: "#4c4c4e",
  border: "none",
  borderRadius: "0.3em",
  color: "#fff",
  "&:focus": {
    outline: "none",
  },

  ...(disabled && {
    color: "#aeaeae",
    cursor: "not-allowed",
    "&:hover": {
      color: "#aeaeae",
    },
  }),
}));

const StyledSelect = styled.select({
  padding: "0.5em",
  fontSize: "1em",
  background: "#4c4c4e",
  border: "none",
  borderRadius: "0.3em",
  color: "#fff",
  "&:focus": {
    outline: "none",
  },
});

const DeleteButton = styled.button(({ disabled }) => ({
  background: "none",
  border: "none",
  borderRadius: "3em",
  color: "#fff",
  cursor: "pointer",
  height: "2em",
  padding: "0",
  width: "2em",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  "&:hover": {
    color: "#4c4c4e",
    background: "#fff",
  },

  ...(disabled && {
    color: "#aeaeae",
    cursor: "not-allowed",
    "&:hover": {
      color: "#aeaeae",
      background: "none",
    },
  }),
}));

const StyledDev = styled(Developer)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const AddButton = styled.button(({ disabled }) => ({
  width: "fit-content",
  background: "none",
  borderRadius: "3em",
  color: "#fff",
  cursor: "pointer",
  padding: "0.5em 1em",
  border: "1px solid #aeaeae",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  "&:hover": {
    color: "#4c4c4e",
    background: "#fff",
  },

  ...(disabled && {
    color: "#aeaeae",
    cursor: "not-allowed",
    "&:hover": {
      color: "#aeaeae",
      background: "none",
    },
  }),
}));

const SubmitButton = styled.button({
  background: "none",
  borderRadius: "3em",
  color: "#fff",
  cursor: "pointer",
  padding: "0.5em 1em",
  border: "1px solid #aeaeae",
  transition: "color 0.1s ease-in-out, background 0.1s ease-in-out",
  "&:hover": {
    color: "#4c4c4e",
    background: "#fff",
  },
});

export const Form = (props) => {
  const { product, onSubmit } = props;

  const [formState, setFormState] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDeveloper = () => {
    if (formState.developers.length < MAX_DEVELOPERS) {
      setFormState((prevState) => ({
        ...prevState,
        developers: [...prevState.developers, ""],
      }));
    }
  };

  const handleDeleteDeveloper = (index) => {
    const newDevs = formState.developers.filter((dev, i) => i !== index);

    setFormState((prevState) => ({
      ...prevState,
      developers: newDevs,
    }));
  };

  const handleDeveloperChange = (e, index) => {
    const newDevs = formState.developers.map((dev, i) => {
      if (i === index) {
        return e.target.value;
      }
      return dev;
    });

    setFormState((prevState) => ({
      ...prevState,
      developers: newDevs,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    onSubmit(formState);
  };

  const developerMap = formState.developers.map((developer, index) => (
    <StyledDev key={index} id="developers" name="developers">
      <StyledInput
        type="text"
        id="developer"
        name="developer"
        value={developer}
        onChange={(e) => handleDeveloperChange(e, index)}
      />
      <DeleteButton
        type="button"
        disabled={formState.developers.length <= 1}
        onClick={() => handleDeleteDeveloper(index)}
      >
        ✕
      </DeleteButton>
    </StyledDev>
  ));

  return (
    <StyledForm>
      <label htmlFor="productName">Product Name</label>
      <StyledInput
        type="text"
        name="productName"
        id="productName"
        value={formState.productName}
        onChange={handleChange}
      />

      <label htmlFor="scrumMasterName">Scrum Master</label>
      <StyledInput
        type="text"
        name="scrumMasterName"
        id="scrumMasterName"
        value={formState.scrumMasterName}
        onChange={handleChange}
      />

      <label htmlFor="productOwnerName">Product Owner</label>
      <StyledInput
        type="text"
        name="productOwnerName"
        id="productOwnerName"
        value={formState.productOwnerName}
        onChange={handleChange}
      />

      <label htmlFor="developers">Developers</label>
      {developerMap}
      <AddButton
        type="button"
        disabled={formState.developers.length >= MAX_DEVELOPERS}
        onClick={handleAddDeveloper}
      >
        Add
      </AddButton>
      <label htmlFor="startDate">Start Date (YYYY / MM / DD)</label>
      <StyledInput
        type="text"
        name="startDate"
        id="startDate"
        disabled={product.startDate}
        value={formState.startDate}
        onChange={handleChange}
      />

      <label htmlFor="methodology">Methodology</label>
      <StyledSelect
        name="methodology"
        id="methodology"
        value={formState.methodology}
        onChange={handleChange}
      >
        <option value=""></option>
        <option value="Scrum">Scrum</option>
        <option value="Waterfall">Waterfall</option>
      </StyledSelect>
      <SubmitButton type="button" onClick={handleOnSubmit}>
        Submit
      </SubmitButton>
    </StyledForm>
  );
};
