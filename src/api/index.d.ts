export type Res<T extends Record<string, unknown>> =
  | ({ code: 0 } & T)
  | { code: 404; error_message: string }

interface CategoryBase {
  category_id: number
  category_name: string
}

interface Category extends CategoryBase {
  children?: CategoryBase[]
}

export function getCategories(): Promise<CategoriesResponse>

interface CategoriesData {
  categories: Category[]
}

export type CategoriesResponse = Res<{ data: CategoriesData }>

type SortBy = 'hot' | 'new'

interface ArticleInfo {
  article_id: string
  user_id: string
  category_id: string
  tag_ids: number[]
  visible_level: number
  link_url: string
  cover_image: string
  is_gfw: number
  title: string
  brief_content: string
  is_english: number
  is_original: number
  user_index: number
  original_type: number
  original_author: string
  content: string
  ctime: string
  mtime: string
  rtime: string
  draft_id: string
  view_count: number
  collect_count: number
  digg_count: number
  comment_count: number
  hot_index: number
  is_hot: number
  rank_index: number
  status: number
  verify_status: number
  audit_status: number
  mark_content: string
}

interface CategoryInfo {
  first_category_id: number
  first_category_name: string
  second_category_id: number
  second_category_name: string
}

interface Article {
  article_id: string
  article_info: ArticleInfo
  author_user_info: UserInfo
  category_info: CategoryInfo
  article_content: string
}

interface ArticlesData {
  articles: Article[]
}

export type ArticlesResponse = Res<{
  data: ArticlesData
  total: number
  has_more: boolean
}>

export function getArticles(
  categoryId: number,
  sortBy: SortBy,
  offset: number,
  limit: number,
): Promise<ArticlesResponse>
