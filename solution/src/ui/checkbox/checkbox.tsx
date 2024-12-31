import styles from "./checkbox.module.css";

interface CheckboxProps {
  // Name of the checkbox
  name: string;
  //Label displayed next to the checkbox
  label: string | React.ReactNode;
  // Value associated with the checkbox
  value: string;
  // Specifies whether the checkbox is checked
  checked?: boolean;
  // Event handler for change events
  onChange?: React.ChangeEventHandler;
}

export function Checkbox(props: CheckboxProps) {
  const { name, label, value, checked, onChange } = props;

  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        name={name}
        className={styles.checkbox}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
