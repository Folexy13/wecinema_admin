import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function CustomFooter() {
  return (
    <div>
      <Footer style={{ textAlign: 'center' }}>
        Built with ❤️ by{' '}
        <a
          href="https://my-portfolio-g8e2htnzv-folexy13.vercel.app/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Aluko Opeyemi F.
        </a>
        |
        <a
          href="https://github.com/folexy13/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Github Repo
        </a>
      </Footer>
    </div>
  );
}

export default CustomFooter;
