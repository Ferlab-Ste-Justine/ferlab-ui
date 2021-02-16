import '!style-loader!css-loader!sass-loader!../../packages/style/index.scss';
import 'antd/dist/antd.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'facebook',
    values: [
        { 
            name: 'twitter', 
            value: '#00aced'
        },
        { 
            name: 'facebook', 
            value: '#3b5998' 
        },
      ],
    }
}