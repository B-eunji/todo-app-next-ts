// 앱 아이콘 집합
const ICON = {
    // 메인 페이지
    'plus': '/icons/plus-white.svg', // 흰색 + 
    'plus-black': '/icons/button/plus.svg', //검정색 +
    'check-box': '/icons/check-white.svg', //체크 박스 - 진행 중
    'check-box-done': '/icons/check-purple.svg',//체크 박스 - 완료
    
    'check': '/icons/check.svg',// 검정색 체크 
    'x': '/icons/X.svg', //흰색 X
    'image-empty': 'icons/img.svg', // 이미지 아이콘
    'circle-button': '/icons/button/circle-button.svg', // 이미지 추가 버튼
    'edit-circle-button': '/icons/button/circle-button2.svg', //이미지 변경 버튼
} as const;

//타입 안전성
export type IconKey = keyof typeof ICON;
export default ICON;