"use client";
import newLink from "@/components/createUrl";
import { useState, useEffect } from "react";
import styles from "@/app/main.module.css";

export default function Home() {
  const [url, setUrl] = useState<string | null>(null);
  const [inputsDisabled, setInputDisabled] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInputDisabled(true);
    const inputText = e.target.elements[0].value; // Obtiene el valor del input
    newLink(inputText).then((e) => {
      if(e){
        setUrl(e);
      } else {
        alert("Ingresa una URL valida!")
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
            Enlace creado: <a href={url!} target={"_blank"} className={styles.linkCreated}>{url}</a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input type={"text"} placeholder={"url"} disabled={inputsDisabled} className={styles.inputField}/>
          <button type={"submit"} disabled={inputsDisabled} className={styles.submitButton}>Acortar</button>
        </form>
      </div>
    </main>
  );
}
