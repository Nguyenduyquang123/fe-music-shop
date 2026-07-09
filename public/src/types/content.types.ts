export interface AboutContent {
    hero_title: string
    hero_subtitle: string
    story_title: string
    story_content: string
    founded_year: string
    location: string
    stats: { label: string; value: string; suffix: string }[]
    features: { title: string; desc: string }[]
    team: { name: string; role: string; desc: string; avatar: string }[]
}

export interface ContactContent {
    address: string
    phone: string
    email: string
    working_hours: string
    zalo_link: string
    facebook_link: string
    youtube_link: string
    map_embed: string
}

export interface Banner {
    id: number
    title: string
    subtitle: string
    image: string
    button_text: string
    button_link: string
    is_active: boolean
    sort_order: number
}

export interface SiteText {
    id: number
    key: string
    label: string
    value: string
    group: string
}