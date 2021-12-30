// Author : Omar Besbes

// this function displays pages on bottom of page
const GeneratePages = (props) => {
	try {
		let page = [];
		for (let i = 0; i < props.nbPages; i++) {
			page[i] =
				<a key={i} className={(parseInt(props.page) === i + 1) ? 'active' : ''} onClick={() => props.changePage(i + 1)}>
					{i + 1}
				</a>;
		}
		return [...page];
	}
	catch (err) {
		document.getElementById('root').innerHTML = err.message;
	}
};

export {GeneratePages};