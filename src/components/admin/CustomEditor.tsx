'use client';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CustomEditor(props: any) {
  return (
    <CKEditor
      editor={ClassicEditor}
      {...props}
    />
  );
}
