import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Button, Form, Card } from 'react-bootstrap'
import Book from './Book';

const BookPage = () => {
    const [list, setList] = useState([]); // State변수 선언, 특징 : 변수값이 바뀌면 랜더링이 자동으로
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [is_end, setIs_end] = useState(false);
    const [query, setQuery] = useState('리액트');

    const getData = async () => { // async는 await이랑 짝꿍
        const url = "https://dapi.kakao.com/v3/search/book?target=title";
        const config = {
            headers: { "Authorization": "KakaoAK b979e6aeda07a0907d3501c51b49df61" },
            params: { "query":  query, "size": 8, "page": page }
        }

        setLoading(true);

        const result = await axios.get(url, config); // 비동기함수를 실행할때 기다리라는뜻으로 await
        console.log(result);
        setList(result.data.documents);
        setIs_end(result.data.meta.is_end);
        setLoading(false);
    }

    const onSubmit = (e) => { // submit 검색기능때 사용
        e. preventDefault(); // 이거 뭔지 알아보기
        setPage(1);
        getData();
    }

    useEffect(() => {
        getData();
    }, [page]); // 랜더링될때 getData함수 호출 // 뒤에 대괄호는 한번만 랜더링될때 한번만 실행하기위해 작성 

    if (loading) return <h1 className='text-center my-5'>로딩중....</h1>

    return (
        <Row>
            <h1 className='text-center my-5'>도서검색</h1>
            <Row>
                <Col md={4}>
                    <Form onSubmit={onSubmit}>
                        <Form.Control 
                            onChange={(e)=>setQuery(e.target.value)} //검색어를 변경하고싶을때 envent 발생
                            placeholder="검색어" value={query}/>
                    </Form>
                </Col>
            </Row>
            <Row>
                {list.map(book => //반복할때 map 사용
                    <Col key={book.isbn} md={3} xs={6} className='my-2'>
                        <Card>
                            <Card.Body>
                                <img src={book.thumbnail} />
                                <div className='ellipsis'>{book.title}</div>
                                <Book book={book} />
                            </Card.Body>
                        </Card>
                    </Col> //반복할때 key를 꼭넣어야함
                )}
                <div className='text-center my-3'>
                    <Button onClick={() => setPage(page - 1)}
                        disabled={page == 1 && true}
                        className='btn-sm'>이전</Button>
                    <spna className='px-3'>{page}</spna>
                    <Button onClick={() => setPage(page + 1)}
                        disabled={is_end && true}
                        className='btn-sm'>다음</Button>
                </div>
            </Row>
        </Row>
    )
}

export default BookPage