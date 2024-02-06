import styled from "styled-components";

const Div = styled.div`
  padding: 15px 15px 70px;
  margin: 15px;
  border-radius: 20px;
  background: var(--white);
  text-align: center;
  h2 {
    line-height: 1.2;
    font-weight: normal;
    font-size: 1.35rem;
    margin-bottom: 20px;
  }
  p {
    max-width: 260px;
    font-size: 0.85rem;
    line-height: 1.3;
    margin: 0px auto 5px;
  }
  p:last-of-type {
    margin-bottom: 20px;
  }
  button,
  a {
    width: 100%;
    background: red;
    margin-top: 6px;
    padding: 13px;
    background: #5c60f8;
    color: var(--white);
    font-weight: bold;
    font-size: 1rem;
    border-radius: 16px;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const CardLarge = ({
  light = false,
  title = "Title",
  text = (
    <>
      <p>Para1</p>
    </>
  ),
  links = [
    { title: "Button", type: "button" },
    { title: "Link", type: "link" },
  ],
}: {
  light: boolean;
  title: React.ReactNode;
  text: React.ReactNode;
  links: {
    title: string;
    type: "button" | "link";
    href?: string;
    onClick?: () => void;
    download?: boolean;
  }[];
}) => {
  return (
    <Div
      className="d-flex flex-column"
      style={{
        background: light ? "var(--white)" : "var(--navy)",
        color: light ? "var(--navy)" : "var(--light-blue)",
      }}
    >
      <div
        style={{
          alignSelf: "center",
          background: "pink",
          borderRadius: "50%",
          width: 60,
          height: 60,
          margin: "40px auto 10px",
        }}
      />
      <h2>{title}</h2>
      {text}
      {links.map((link) =>
        link.type === "button" ? (
          <button key={link.title} onClick={link?.onClick}>
            {link.title}
          </button>
        ) : (
          <a
            key={link.title}
            download={link?.download}
            href={link?.href}
            target={"_blank"}
          >
            {link.title}
          </a>
        )
      )}
    </Div>
  );
};