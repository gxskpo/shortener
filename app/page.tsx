"use client";
import newLink from "@/components/createUrl";
import {useState, useEffect, FormEvent} from "react";
import styles from "@/app/main.module.css";




export default function Home() {
  const [url, setUrl] = useState<string | null>(null);
  const [inputsDisabled, setInputDisabled] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setInputDisabled(true);
    const target = e.target as HTMLFormElement
    const element = target.elements[0] as HTMLInputElement;
    const inputText = element.value;
    newLink(inputText).then((e) => {
      if (e) {
        setUrl(e);
      } else {
        alert("Ingresa una URL valida!");
      }
      setInputDisabled(false);
    });
  };

  return (
    <main>
      <div className={styles.urlShortener}>
        <div
          className={styles.crocodilo}
          style={{ display: url != null ? "block" : "none" }}
        >
          <p>
            Enlace creado:{" "}
            <a href={url!} target={"_blank"} className={styles.linkCreated}>
              {url}
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            type={"text"}
            placeholder={"url"}
            disabled={inputsDisabled}
            className={styles.inputField}
          />
          <button
            type={"submit"}
            disabled={inputsDisabled}
            className={styles.submitButton}
          >
            Acortar
          </button>
        </form>
      </div>
      <footer className={styles.footer}>
        <a href={"https://github.com/gxskpo/shortener"} target={"_blank"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
          className={styles.ghIcon}
        >
          <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
        </svg>
        </a>
      </footer>
    </main>
  );
}
