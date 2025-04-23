import styled from 'styled-components';

export const PracticeQuestionsContainer = styled.div`
    margin-top: 2rem;
`;

export const QuestionBlock = styled.div`
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
`;

export const QuestionText = styled.h3`
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.15rem;
    color: #1f2937;
    display: flex;
    align-items: flex-start;

    svg {
        margin-right: 0.75rem;
        color: #4f46e5;
        flex-shrink: 0;
        font-size: 1.4em;
    }
`;

export const OptionsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const OptionItem = styled.li`
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #f3f4f6;
        border-color: #9ca3af;
    }

    ${props => props.isSelected && `
        background-color: #bfdbfe;
        border-color: #60a5fa;
        font-weight: 500;
    `}

    ${props => props.isCorrect && `
        background-color: #d1fae5;
        border-color: #34d399;
        font-weight: 600;
    `}

     ${props => props.isIncorrect && `
        background-color: #fee2e2;
        border-color: #f87171;
        font-weight: 500;
    `}
`;

export const OptionLetter = styled.span`
    font-weight: 600;
    margin-right: 1rem;
    color: #4f46e5;
    ${props => props.isCorrect && ` color: #059669; `}
    ${props => props.isIncorrect && ` color: #dc2626; `}
`;

export const FeedbackArea = styled.div`
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid;
    background-color: #f3f4f6;
    border-color: #d1d5db;
    color: #374151;

    ${props => props.isCorrect && `
        background-color: #d1fae5;
        border-color: #34d399;
        color: #065f46;
    `}

     ${props => props.isIncorrect && `
        background-color: #fee2e2;
        border-color: #f87171;
        color: #991b1b;
    `}
`;

export const ExplanationText = styled.p`
    margin-top: 0.5em;
    margin-bottom: 0;
    line-height: 1.6;
    font-size: 1em;
`;

export const CheckAnswerButton = styled.button`
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.2rem;
    margin-top: 1rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
        background-color: #4338ca;
    }
     &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    svg {
        margin-right: 0.5rem;
    }
`;

export const ResetButton = styled(CheckAnswerButton)`
    background-color: #6b7280;
    margin-left: 0.5rem;

    &:hover:not(:disabled) {
        background-color: #4b5563;
    }
`;