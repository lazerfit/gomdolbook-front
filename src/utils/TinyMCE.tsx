import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import Loader from '@/components/atoms/Loader';
import { styled } from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

interface Props {
  placeholder: string;
  onChangeValue: (text: string) => void;
}

const key = import.meta.env.VITE_TINY_MCE_API_KEY;

const TinyMCE = ({ placeholder, onChangeValue }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      <Editor
        apiKey={key}
        initialValue={placeholder}
        onEditorChange={(newValue: string) => onChangeValue(newValue)}
        init={{
          height: 1000,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        }}
        onInit={() => {
          setIsLoading(false);
        }}
      />
    </>
  );
};

export default TinyMCE;
