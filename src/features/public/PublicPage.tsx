import React from 'react'
import { PageService } from '../../services'
import { useAsync, useUrlParams } from '../../hooks';

export function PublicPage() {

  const pageService = new PageService();

  const userName = useUrlParams("username");
  const slug = useUrlParams("slug");

  const { value: page, loading, error } = useAsync(() => pageService.getBySlug(userName, slug), [slug, userName]);

  return (
    <>
      <div className="text-xl text-center my-5 font-bold">PublicPage</div>

      <h1>{page?.value[0].name}</h1>
      <h1>{slug}</h1>


    </>

  )
}

export default PublicPage
