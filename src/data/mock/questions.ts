import type { Question } from '../mockData'

export const questions: Question[] = [
    {
        id: 1,
        question: '오랜만에 찾아온 휴가, 당신은 어떤 여행을 떠나고 싶나요?',
        imageUrl: '/images/test/healing.png',
        options: [
            { text: '조용한 숲속 숙소에서 하루종일 뒹굴거리기', score: { HEALING: 2, CALM: 2 } },
            { text: '새로 생긴 핫플레이스와 전시회 투어하기', score: { SHOPPING: 3 } },
            { text: '가장 유명한 로컬 맛집 리스트부터 정리하기', score: { FOOD: 3 } },
            { text: '인생샷을 건질 수 있는 예쁜 스팟 찾아보기', score: { PHOTO: 3 } },
        ],
    },
    {
        id: 2,
        question: '짐을 싸며 떠올린 이번 여행의 분위기는?',
        imageUrl: '/images/test/calm.png',
        options: [
            { text: '조용하고 나만의 시간을 보내는 여행', score: { CALM: 3, HEALING: 1 } },
            { text: '사람 많은 곳에서 에너지를 느끼는 여행', score: { SHOPPING: 2, EXPLORER: 1 } },
            { text: '계획 없이 자유롭게 흘러가는 여행', score: { EXPLORER: 3 } },
            { text: '감성과 분위기를 기록하는 여행', score: { PHOTO: 3, HEALING: 1 } },
        ],
    },
    {
        id: 3,
        question: '여행지에 도착했다! 가장 먼저 하는 행동은?',
        imageUrl: '/images/test/explorer.png',
        options: [
            { text: '주변 자연을 천천히 산책한다', score: { HEALING: 2, CALM: 2 } },
            { text: '분위기 좋은 카페부터 찾아간다', score: { PHOTO: 2, HEALING: 1 } },
            { text: '유명한 맛집부터 찾아간다', score: { FOOD: 3 } },
            { text: '바로 액티비티를 예약한다', score: { EXPLORER: 3 } },
        ],
    },
    {
        id: 4,
        question: '배가 고파졌다. 당신의 선택은?',
        imageUrl: '/images/test/food.png',
        options: [
            { text: '조용한 분위기의 브런치 카페', score: { HEALING: 2, PHOTO: 1 } },
            { text: 'SNS에서 핫한 웨이팅 맛집', score: { FOOD: 2, SHOPPING: 1 } },
            { text: '길거리 음식부터 다양하게 먹어보기', score: { FOOD: 2, EXPLORER: 1 } },
            { text: '감성 인테리어 카페에서 사진 찍기', score: { PHOTO: 3 } },
        ],
    },
    {
        id: 5,
        question: '오후에는 어떻게 시간을 보낼까?',
        imageUrl: '/images/test/shopping.png',
        options: [
            { text: '공원이나 바다에서 여유롭게 시간 보내기', score: { HEALING: 2, CALM: 2 } },
            { text: '쇼핑 거리나 팝업스토어 구경', score: { SHOPPING: 3 } },
            { text: '숨겨진 명소를 찾아 돌아다니기', score: { EXPLORER: 3 } },
            { text: '감성적인 골목에서 사진 찍기', score: { PHOTO: 3 } },
        ],
    },
    {
        id: 6,
        question: '길을 잃었다! 당신의 반응은?',
        imageUrl: '/images/test/explorer.png',
        options: [
            { text: '이것도 여행이지, 그냥 계속 걸어본다', score: { EXPLORER: 3 } },
            { text: '지도 앱으로 빠르게 해결한다', score: { HEALING: 1, CALM: 1 } },
            { text: '근처 맛집부터 찾아 들어간다', score: { FOOD: 3 } },
            { text: '예쁜 골목 발견! 사진부터 찍는다', score: { PHOTO: 3 } },
        ],
    },
    {
        id: 7,
        question: '숙소를 고를 때 가장 중요하게 생각하는 것은?',
        imageUrl: '/images/test/healing.png',
        options: [
            { text: '자연이 보이는 탁 트인 뷰와 조용한 환경', score: { HEALING: 2, CALM: 2 } },
            { text: '교통이 편리하고 번화가와 가까운 위치', score: { SHOPPING: 3 } },
            { text: '조식이 맛있거나 야시장과 가까운 곳', score: { FOOD: 3 } },
            { text: '인테리어가 감성적이고 채광이 좋은 곳', score: { PHOTO: 3 } },
        ],
    },
    {
        id: 8,
        question: '여행 중 갑자기 비가 온다면?',
        imageUrl: '/images/test/calm.png',
        options: [
            { text: '숙소에서 빗소리를 들으며 따뜻한 차 마시기', score: { CALM: 3, HEALING: 1 } },
            { text: '실내 쇼핑몰이나 대형 미술관으로 일정 변경', score: { SHOPPING: 2, PHOTO: 1 } },
            { text: '비 오는 날엔 파전이지! 실내 맛집 탐방', score: { FOOD: 3 } },
            { text: '투명 우산을 사고 감성적인 비 오는 풍경 찍기', score: { PHOTO: 3 } },
        ],
    },
    {
        id: 9,
        question: '누구와 함께 여행하고 있나요?',
        imageUrl: '/images/test/photo.png',
        options: [
            { text: '혼자 여행, 나만의 페이스로', score: { CALM: 3, HEALING: 1 } },
            { text: '둘이서 조용히 감성 여행', score: { PHOTO: 2, HEALING: 1 } },
            { text: '친구들과 신나게 에너지 폭발!', score: { EXPLORER: 2, SHOPPING: 1 } },
            { text: '누구랑 가든 상관없어요!', score: { HEALING: 1 } },
        ],
    },
    {
        id: 10,
        question: '여행 마지막 밤, 당신은 무엇을 하고 있나요?',
        imageUrl: '/images/test/photo.png',
        options: [
            { text: '바다나 공원에 앉아 여유롭게 윤슬 감상하기', score: { HEALING: 2, CALM: 2 } },
            { text: '마지막까지 쇼핑과 야경 즐기기', score: { SHOPPING: 3 } },
            { text: '아쉬우니까 마지막으로 현지 특산물 먹방', score: { FOOD: 3 } },
            { text: '여행 동안 찍은 사진들 정리하며 베스트 컷 고르기', score: { PHOTO: 3 } },
        ],
    },
]
