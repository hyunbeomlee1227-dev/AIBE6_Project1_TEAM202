export type TravelType = 'HEALING' | 'SHOPPING' | 'FOOD' | 'PHOTO' | 'CALM' | 'EXPLORER'

export type ScoreMap = Partial<Record<TravelType, number>>

export type AnswerOption = {
    text: string
    score: ScoreMap
}

export interface Question {
    id: number
    question: string
    imageUrl: string
    options: AnswerOption[]
}

export interface Place {
    id: string
    name: string
    description: string
    imageUrl: string
    tags: string[]
    location: string
    type: TravelType
    gallery: string[]
}

export interface ResultType {
    id: TravelType
    title: string
    subtitle: string
    description: string
    emoji: string
    color: string
}

export interface User {
    id: string
    email: string
    nickname: string
    avatar: string
    travelType: TravelType
    createdAt: string
}

export interface Post {
    id: string
    author: User
    title: string
    content: string
    image: string
    likeCount: number
    commentCount: number
    isLiked: boolean
    isBookmarked: boolean
    type: TravelType
    createdAt: string
    comments: Comments[]
}

export interface Comments {
    id: string
    author: User
    content: string
    createdAt: string
}

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

export const places: Place[] = [
    {
        id: 'p1',
        name: '제주 사려니숲길',
        description:
            '피톤치드 가득한 삼나무 숲길에서 즐기는 온전한 휴식. 흙을 밟으며 걷다 보면 마음의 평화가 찾아옵니다.',
        imageUrl: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800',
        tags: ['#자연', '#숲길', '#산책', '#피톤치드'],
        location: '제주특별자치도 제주시 조천읍',
        type: 'HEALING',
        gallery: [
            'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
        ],
    },
    {
        id: 'p2',
        name: '부산 해운대 블루라인파크',
        description:
            '해안 절경을 따라 달리는 로맨틱한 해변열차. 푸른 바다와 도시의 스카이라인이 어우러진 멋진 풍경을 감상하세요.',
        imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
        tags: ['#바다', '#해변열차', '#핫플', '#야경'],
        location: '부산광역시 해운대구',
        type: 'SHOPPING',
        gallery: [
            'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1580397581145-cb57850228d7?auto=format&fit=crop&q=80&w=800',
        ],
    },
    {
        id: 'p3',
        name: '전주 한옥마을 먹거리 골목',
        description: '길거리 음식의 천국! 비빔밥 고로케부터 치즈구이, 육전까지 끝없이 이어지는 맛의 향연을 즐겨보세요.',
        imageUrl: 'https://images.unsplash.com/photo-1580397581145-cb57850228d7?auto=format&fit=crop&q=80&w=800',
        tags: ['#먹방', '#길거리음식', '#전통', '#맛집투어'],
        location: '전라북도 전주시 완산구',
        type: 'FOOD',
        gallery: [
            'https://images.unsplash.com/photo-1580397581145-cb57850228d7?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
        ],
    },
    {
        id: 'p4',
        name: '강릉 안목해변 카페거리',
        description:
            '푸른 동해바다를 배경으로 인생샷을 남길 수 있는 곳. 통유리창 너머로 보이는 바다와 함께 커피 한 잔의 여유를.',
        imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
        tags: ['#오션뷰', '#카페', '#인생샷', '#커피'],
        location: '강원도 강릉시 창해로',
        type: 'PHOTO',
        gallery: [
            'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800',
        ],
    },
    {
        id: 'p5',
        name: '경주 대릉원 돌담길',
        description:
            '고즈넉한 돌담길을 따라 걷다 보면 만나는 평화로운 풍경. 계절마다 바뀌는 자연의 색감을 감상하기 좋아요.',
        imageUrl: 'https://images.unsplash.com/photo-1598887142487-3c854d50d621?auto=format&fit=crop&q=80&w=800',
        tags: ['#산책', '#돌담길', '#고즈넉함', '#힐링'],
        location: '경상북도 경주시 황남동',
        type: 'HEALING',
        gallery: ['https://images.unsplash.com/photo-1598887142487-3c854d50d621?auto=format&fit=crop&q=80&w=800'],
    },
]

export const mockUsers: User[] = [
    {
        id: 'u1',
        email: 'photo@test.com',
        nickname: '지윤',
        avatar: 'https://i.pravatar.cc/150?u=1',
        travelType: 'PHOTO',
        createdAt: '2023-01-01',
    },
    {
        id: 'u2',
        email: 'food@test.com',
        nickname: '민수',
        avatar: 'https://i.pravatar.cc/150?u=2',
        travelType: 'FOOD',
        createdAt: '2023-02-15',
    },
    {
        id: 'u3',
        email: 'healing@test.com',
        nickname: '수아',
        avatar: 'https://i.pravatar.cc/150?u=3',
        travelType: 'HEALING',
        createdAt: '2023-03-20',
    },
    {
        id: 'u4',
        email: 'city@test.com',
        nickname: '태형',
        avatar: 'https://i.pravatar.cc/150?u=4',
        travelType: 'SHOPPING',
        createdAt: '2023-04-10',
    },
]

export const posts: Post[] = [
    {
        id: 'post1',
        author: mockUsers[0],
        title: '강릉 안목해변에서 인생샷 건졌어요 📸',
        content:
            '바다 색감 미쳤다...💙 여기서 찍은 사진만 100장 넘음! 날씨 좋은 날 꼭 가보세요. 카페거리에서 커피 한 잔 하면서 바다 보면 진짜 힐링 그 자체입니다.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
        likeCount: 124,
        commentCount: 12,
        isLiked: false,
        isBookmarked: true,
        type: 'PHOTO',
        createdAt: '2023-10-01T10:00:00Z',
        comments: [
            {
                id: 'c1',
                author: mockUsers[1],
                content: '와 진짜 예쁘네요! 저도 가보고 싶어요 ㅠㅠ',
                createdAt: '2023-10-01T11:00:00Z',
            },
            {
                id: 'c2',
                author: mockUsers[2],
                content: '사진 색감 보정 어떻게 하셨어요? 꿀팁 공유해주세요!',
                createdAt: '2023-10-01T12:00:00Z',
            },
        ],
    },
    {
        id: 'post2',
        author: mockUsers[1],
        title: '전주 한옥마을 먹방 투어 대성공 🤤',
        content:
            '웨이팅 1시간 한 보람이 있는 맛! 길거리 음식부터 한정식까지 입에서 살살 녹아요. 특히 육전이랑 치즈구이는 꼭 드셔보세요 강추합니다.',
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
        likeCount: 89,
        commentCount: 5,
        isLiked: true,
        isBookmarked: false,
        type: 'FOOD',
        createdAt: '2023-10-02T14:30:00Z',
        comments: [
            {
                id: 'c1',
                author: mockUsers[1],
                content: '와 진짜 예쁘네요! 저도 가보고 싶어요 ㅠㅠ',
                createdAt: '2023-10-01T11:00:00Z',
            },
            {
                id: 'c2',
                author: mockUsers[2],
                content: '사진 색감 보정 어떻게 하셨어요? 꿀팁 공유해주세요!',
                createdAt: '2023-10-01T12:00:00Z',
            },
        ],
    },
    {
        id: 'post3',
        author: mockUsers[2],
        title: '사려니숲길, 조용히 걷기 좋은 곳 🌿',
        content:
            '아무것도 안 하고 가만히 숲소리만 들어도 힐링되는 기분. 피톤치드 가득 마시고 왔어요. 복잡한 생각 비우고 싶을 때 추천해요.',
        image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800',
        likeCount: 256,
        commentCount: 24,
        isLiked: false,
        isBookmarked: false,
        type: 'HEALING',
        createdAt: '2023-10-03T09:15:00Z',
        comments: [
            {
                id: 'c1',
                author: mockUsers[1],
                content: '와 진짜 예쁘네요! 저도 가보고 싶어요 ㅠㅠ',
                createdAt: '2023-10-01T11:00:00Z',
            },
            {
                id: 'c2',
                author: mockUsers[2],
                content: '사진 색감 보정 어떻게 하셨어요? 꿀팁 공유해주세요!',
                createdAt: '2023-10-01T12:00:00Z',
            },
        ],
    },
    {
        id: 'post4',
        author: mockUsers[3],
        title: '해운대 블루라인파크 야경 미쳤음 ✨',
        content:
            '이번 주말 팝업스토어 도장깨기 완료! 해변열차 타고 보는 야경까지 완벽했다. 도시의 활기를 제대로 느끼고 온 주말 여행.',
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
        likeCount: 167,
        commentCount: 8,
        isLiked: false,
        isBookmarked: true,
        type: 'SHOPPING',
        createdAt: '2023-10-04T20:45:00Z',
        comments: [
            {
                id: 'c1',
                author: mockUsers[1],
                content: '와 진짜 예쁘네요! 저도 가보고 싶어요 ㅠㅠ',
                createdAt: '2023-10-01T11:00:00Z',
            },
            {
                id: 'c2',
                author: mockUsers[2],
                content: '사진 색감 보정 어떻게 하셨어요? 꿀팁 공유해주세요!',
                createdAt: '2023-10-01T12:00:00Z',
            },
        ],
    },
]
