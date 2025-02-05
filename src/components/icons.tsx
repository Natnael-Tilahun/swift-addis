type IconProps = React.HTMLAttributes<SVGElement> & {
  fill?: string;
};

export const Icons = {
  rectangle: (props: IconProps) => (
    <div className="flex">
      <svg
        {...props}
        width="11"
        height="28"
        viewBox="0 0 11 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={props.fill}
          d="M0 4C0 1.79086 1.79086 0 4 0H8.96692C10.4028 0 11.3708 1.4681 10.8052 2.78784L6 14L0 28L0 4Z"
        />
      </svg>
      <svg
        {...props}
        width="11"
        height="28"
        viewBox="0 0 11 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={props.fill}
          d="M0 4C0 1.79086 1.79086 0 4 0H8.96692C10.4028 0 11.3708 1.4681 10.8052 2.78784L6 14L0 28L0 4Z"
        />
      </svg>
    </div>
  ),
};
