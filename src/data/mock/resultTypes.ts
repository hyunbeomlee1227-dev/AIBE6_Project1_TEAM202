import type { TravelType, ResultType } from '../mockData'

export const resultTypes: Record<TravelType, ResultType> = {
    HEALING: {
        id: 'HEALING',
        title: '감성 힐링 여행가',
        subtitle: '바람 소리와 여유를 사랑하는',
        description:
            '복잡한 일상에서 벗어나 온전한 쉼을 즐기는 당신! 조용한 자연 속에서 에너지를 충전하는 시간을 가장 좋아해요. 남들 다 가는 명소보다는 나만의 비밀스러운 아지트 같은 공간을 선호하네요.',
        emoji: '🌿',
        color: 'bg-warm',
    },
    SHOPPING: {
        id: 'SHOPPING',
        title: '소비형 도시 탐험가',
        subtitle: '트렌드와 활기를 즐기는',
        description:
            '새로운 자극과 영감을 찾아 떠나는 당신! 화려한 야경, 세련된 건축물, 힙한 팝업스토어 등 도시가 주는 에너지를 사랑해요. 계획적으로 핫플을 정복하는 것을 즐기는 멋진 탐험가입니다.',
        emoji: '🏙️',
        color: 'bg-secondary',
    },
    FOOD: {
        id: 'FOOD',
        title: '맛집 집착형 여행가',
        subtitle: '여행의 8할은 식도락인',
        description:
            '맛있는 음식이 있는 곳이라면 어디든 갈 수 있는 당신! 현지인만 아는 찐 맛집부터 웨이팅 필수인 디저트 카페까지, 미각으로 여행지를 기억하는 진정한 미식가네요.',
        emoji: '🍜',
        color: 'bg-accent',
    },
    PHOTO: {
        id: 'PHOTO',
        title: '인스타 감성 수집가',
        subtitle: '모든 순간을 프레임에 담는',
        description:
            '아름다운 순간을 영원히 남기고 싶어하는 당신! 빛이 예쁘게 드는 카페, 색감이 쨍한 골목길 등 시각적인 아름다움에 민감해요. 당신의 사진첩은 언제나 화보집 같겠네요.',
        emoji: '📸',
        color: 'bg-primary',
    },
    CALM: {
        id: 'CALM',
        title: '고요 추구 여행가',
        subtitle: '소음 없는 여백을 사랑하는',
        description:
            '빠르게 돌아가는 세상 속에서 의도적으로 멈추는 당신! 붐비는 관광지보다 인적 드문 찻집이나 새벽 해변이 더 좋아요. 고요함 속에서 비로소 내면의 소리를 듣는 진정한 쉼의 달인입니다.',
        emoji: '🧘',
        color: 'bg-warm',
    },
    EXPLORER: {
        id: 'EXPLORER',
        title: '개척자형 여행가',
        subtitle: '지도에 없는 길을 즐기는',
        description:
            '정해진 루트보다 발이 닿는 곳이 목적지인 당신! 골목 끝이 어디로 이어지는지, 저 언덕 너머엔 뭐가 있는지 궁금해서 못 참아요. 예상치 못한 발견이 주는 짜릿함을 아는 진짜 탐험가입니다.',
        emoji: '🧭',
        color: 'bg-secondary',
    },
}
