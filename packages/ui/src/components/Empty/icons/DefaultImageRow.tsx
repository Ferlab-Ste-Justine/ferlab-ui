import React from 'react';
import IIconProps from './type';

const DefaultImageRow = ({ className = '' }: IIconProps) => (
    <svg
        className={className}
        width="248"
        height="72"
        viewBox="0 0 248 72"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M48.5625 51.3125H10.9375V17.1875C10.9375 16.9469 10.7406 16.75 10.5 16.75H7.4375C7.19687 16.75 7 16.9469 7 17.1875V54.8125C7 55.0531 7.19687 55.25 7.4375 55.25H48.5625C48.8031 55.25 49 55.0531 49 54.8125V51.75C49 51.5094 48.8031 51.3125 48.5625 51.3125ZM15.75 46.9375H18.8125C19.0531 46.9375 19.25 46.7406 19.25 46.5V38.625C19.25 38.3844 19.0531 38.1875 18.8125 38.1875H15.75C15.5094 38.1875 15.3125 38.3844 15.3125 38.625V46.5C15.3125 46.7406 15.5094 46.9375 15.75 46.9375ZM24.0625 46.9375H27.125C27.3656 46.9375 27.5625 46.7406 27.5625 46.5V29C27.5625 28.7594 27.3656 28.5625 27.125 28.5625H24.0625C23.8219 28.5625 23.625 28.7594 23.625 29V46.5C23.625 46.7406 23.8219 46.9375 24.0625 46.9375ZM32.375 46.9375H35.4375C35.6781 46.9375 35.875 46.7406 35.875 46.5V33.2656C35.875 33.025 35.6781 32.8281 35.4375 32.8281H32.375C32.1344 32.8281 31.9375 33.025 31.9375 33.2656V46.5C31.9375 46.7406 32.1344 46.9375 32.375 46.9375ZM40.6875 46.9375H43.75C43.9906 46.9375 44.1875 46.7406 44.1875 46.5V24.625C44.1875 24.3844 43.9906 24.1875 43.75 24.1875H40.6875C40.4469 24.1875 40.25 24.3844 40.25 24.625V46.5C40.25 46.7406 40.4469 46.9375 40.6875 46.9375Z" />
        <path d="M111.25 36.3278H91.6719V16.7497C91.6719 16.5091 91.475 16.3122 91.2344 16.3122H89.8125C86.9398 16.3075 84.0945 16.8709 81.4403 17.9699C78.7861 19.0689 76.3754 20.6819 74.3469 22.7161C72.3492 24.7076 70.7575 27.0683 69.6602 29.6669C68.5183 32.3621 67.9324 35.2601 67.9375 38.1872C67.9328 41.0599 68.4962 43.9053 69.5952 46.5595C70.6943 49.2136 72.3073 51.6243 74.3414 53.6528C76.3485 55.6599 78.6891 57.2403 81.2922 58.3396C83.9874 59.4814 86.8854 60.0673 89.8125 60.0622C92.6853 60.0669 95.5306 59.5035 98.1848 58.4045C100.839 57.3055 103.25 55.6925 105.278 53.6583C107.285 51.6513 108.866 49.3106 109.965 46.7075C111.107 44.0123 111.693 41.1143 111.688 38.1872V36.7653C111.688 36.5247 111.491 36.3278 111.25 36.3278ZM102.593 51.0825C100.9 52.7627 98.8913 54.0923 96.6832 54.9951C94.4751 55.8978 92.1105 56.356 89.725 56.3435C84.9071 56.3216 80.3789 54.4349 76.9719 51.0278C73.543 47.5989 71.6563 43.038 71.6563 38.1872C71.6563 33.3364 73.543 28.7755 76.9719 25.3466C79.9578 22.3606 83.8024 20.5396 87.9532 20.1239V40.0466H107.876C107.455 44.2192 105.617 48.0856 102.593 51.0825ZM116.063 33.2872L115.92 31.745C115.456 26.7083 113.219 21.956 109.62 18.3685C106.019 14.7744 101.277 12.5501 96.211 12.0794L94.6633 11.9372C94.4063 11.9153 94.1875 12.1122 94.1875 12.3692V33.3747C94.1875 33.6153 94.3844 33.8122 94.625 33.8122L115.625 33.7575C115.882 33.7575 116.084 33.5388 116.063 33.2872ZM97.8953 30.1044V16.0716C101.34 16.7926 104.502 18.4987 106.995 20.9825C109.495 23.4763 111.206 26.6481 111.917 30.0661L97.8953 30.1044Z" />
        <path d="M178.641 16.9688H133.141C132.173 16.9688 131.391 17.7508 131.391 18.7188V53.7188C131.391 54.6867 132.173 55.4688 133.141 55.4688H178.641C179.609 55.4688 180.391 54.6867 180.391 53.7188V18.7188C180.391 17.7508 179.609 16.9688 178.641 16.9688ZM176.453 51.5312H135.328V20.9062H176.453V51.5312ZM140.42 47.0305C140.589 47.2 140.868 47.2 141.037 47.0305L150.471 37.5969L156.727 43.8586C156.897 44.0281 157.176 44.0281 157.345 43.8586L173.587 27.6055C173.757 27.4359 173.757 27.157 173.587 26.9875L171.575 24.975C171.493 24.8936 171.382 24.8479 171.266 24.8479C171.15 24.8479 171.039 24.8936 170.957 24.975L157.039 38.8984L150.783 32.6367C150.701 32.5553 150.59 32.5096 150.474 32.5096C150.358 32.5096 150.247 32.5553 150.165 32.6367L138.412 44.3945C138.331 44.4768 138.285 44.5878 138.285 44.7035C138.285 44.8192 138.331 44.9303 138.412 45.0125L140.42 47.0305Z" />
        <path d="M240.562 51.3125H202.938V17.1875C202.938 16.9469 202.741 16.75 202.5 16.75H199.438C199.197 16.75 199 16.9469 199 17.1875V54.8125C199 55.0531 199.197 55.25 199.438 55.25H240.562C240.803 55.25 241 55.0531 241 54.8125V51.75C241 51.5094 240.803 51.3125 240.562 51.3125ZM207.75 41.0312C207.75 41.9595 208.119 42.8497 208.775 43.5061C209.432 44.1625 210.322 44.5312 211.25 44.5312C212.178 44.5312 213.068 44.1625 213.725 43.5061C214.381 42.8497 214.75 41.9595 214.75 41.0312C214.75 40.103 214.381 39.2128 213.725 38.5564C213.068 37.9 212.178 37.5312 211.25 37.5312C210.322 37.5312 209.432 37.9 208.775 38.5564C208.119 39.2128 207.75 40.103 207.75 41.0312ZM214.203 28.7812C214.203 29.4774 214.48 30.1451 214.972 30.6374C215.464 31.1297 216.132 31.4062 216.828 31.4062C217.524 31.4062 218.192 31.1297 218.684 30.6374C219.177 30.1451 219.453 29.4774 219.453 28.7812C219.453 28.0851 219.177 27.4174 218.684 26.9251C218.192 26.4328 217.524 26.1562 216.828 26.1562C216.132 26.1562 215.464 26.4328 214.972 26.9251C214.48 27.4174 214.203 28.0851 214.203 28.7812ZM222.844 41.25C222.844 42.6424 223.397 43.9777 224.381 44.9623C225.366 45.9469 226.701 46.5 228.094 46.5C229.486 46.5 230.821 45.9469 231.806 44.9623C232.791 43.9777 233.344 42.6424 233.344 41.25C233.344 39.8576 232.791 38.5223 231.806 37.5377C230.821 36.5531 229.486 36 228.094 36C226.701 36 225.366 36.5531 224.381 37.5377C223.397 38.5223 222.844 39.8576 222.844 41.25ZM230.938 24.0781C230.938 24.8904 231.26 25.6693 231.834 26.2436C232.409 26.818 233.188 27.1406 234 27.1406C234.812 27.1406 235.591 26.818 236.166 26.2436C236.74 25.6693 237.062 24.8904 237.062 24.0781C237.062 23.2659 236.74 22.4869 236.166 21.9126C235.591 21.3383 234.812 21.0156 234 21.0156C233.188 21.0156 232.409 21.3383 231.834 21.9126C231.26 22.4869 230.938 23.2659 230.938 24.0781Z" />
    </svg>
);
export default DefaultImageRow;
