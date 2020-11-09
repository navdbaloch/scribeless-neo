export interface ListResponse {
  links: Links;
  page: Page;
}

export interface Links {
  next?: string;
  prev?: string;
  self: string;
}

export interface Page {
  number: number;
  size: number;
  total_elements: string;
  total_pages: string;
}
