import _code_examples from "data/content/html/code-examples.html";
import _index from "data/content/html/index.html";
import _sub_dir__index from "data/content/html/sub-dir/index.html";
import _sub_dir__sub_page1 from "data/content/html/sub-dir/sub-page1.html";
import _sub_dir__sub_page2 from "data/content/html/sub-dir/sub-page2.html";

const code_examples = { template: _code_examples, label: "Code examples" };
const index = { template: _index, label: "Index" };
const sub_dir__index = { template: _sub_dir__index, label: "Index" };
const sub_dir__sub_page1 = { template: _sub_dir__sub_page1, label: "Sub page1" };
const sub_dir__sub_page2 = { template: _sub_dir__sub_page2, label: "Sub page2" };

export {
	code_examples,
	index,
	sub_dir__index,
	sub_dir__sub_page1,
	sub_dir__sub_page2
};
