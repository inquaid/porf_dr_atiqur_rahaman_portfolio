import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const TypewriterText = styled.span`
  display: inline;
`;

const Cursor = styled.span<{ $isTyping: boolean }>`
  display: inline-block;
  width: 3px;
  height: 1em;
  background: ${({ theme }) => theme.primary};
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: ${blink} 1s step-end infinite;
  animation-play-state: ${(props) => (props.$isTyping ? 'paused' : 'running')};
`;

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2000,
  className,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[textIndex] || '';

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
            setIsTyping(true);
          } else {
            // Finished typing, wait before deleting
            setIsTyping(false);
            setTimeout(() => setIsDeleting(true), delayBetween);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
            setIsTyping(true);
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <TypewriterText className={className}>
      {displayText}
      <Cursor $isTyping={isTyping} />
    </TypewriterText>
  );
};

export default Typewriter;
