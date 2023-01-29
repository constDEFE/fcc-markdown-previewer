import { marked } from "marked";
import { ChangeEvent, FC, useState } from "react"
import Prism from 'prismjs';
import { initialText } from "./initialText";
import "./App.scss";

marked.setOptions({
  breaks: true,
  highlight: (code, lang) => {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    } else {
      return code;
    }
  },
});

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

interface EditorProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  return <textarea onChange={onChange} value={value} id="editor" />;
};

interface PreviewerProps {
  content: string
}

const Previewer: FC<PreviewerProps> = ({ content }) => {
  return (
    <div id="preview" dangerouslySetInnerHTML={{
      __html: marked(content, { renderer })
    }}/>
  );
};

const App: FC = () => {
  const [text, setText] = useState<string>(initialText);

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setText(event.target.value);
  }

  return (
    <main className="App">
      <section>
        <Editor value={text} onChange={handleChange} />
      </section>
      <section>
        <Previewer content={text} />
      </section>
    </main>
  );
};

export default App;