import { TaskType } from '../../types';

export type HeadingProps = {
  tasks: TaskType[] | null;
  isInputToggled: boolean;
  handleToggleInput: () => void;
};
