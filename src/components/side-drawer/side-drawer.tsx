import { Component, Prop, State, Method } from "@stencil/core";

@Component({
	tag: "uc-side-drawer",
	styleUrl: "./side-drawer.css",
	shadow: true,
})
export class SideDrawer {
	@State() showContactInfo = false;
	@Prop({ reflectToAttr: true }) title: string;
	@Prop({ reflectToAttr: true, mutable: true }) opened: boolean;
	onCloseDrawer() {
		this.opened = false;
	}
	onContentChange(content: String) {
		this.showContactInfo = content === "contact";
	}
	@Method()
	open() {
		this.opened = true;
	}
	render() {
		let mainContent = <slot />;
		if (this.showContactInfo) {
			mainContent = (
				<div id="contact-info">
					<h2>You can contact us at</h2>
					<ul>
						<li>Phone: 1234567</li>
						<li>email: xyz@z.com</li>
					</ul>
				</div>
			);
		}

		return [
			<div class="backdrop" />,
			<aside>
				<header>
					<h1>{this.title}</h1>
					<button id="close-drawer-btn" onClick={this.onCloseDrawer.bind(this)}>
						X
					</button>
				</header>
				<section id="tabs">
					<button
						class={!this.showContactInfo ? "active" : ""}
						onClick={this.onContentChange.bind(this, "nav")}
					>
						Navigation
					</button>
					<button
						class={this.showContactInfo ? "active" : ""}
						onClick={this.onContentChange.bind(this, "contact")}
					>
						Contact
					</button>
				</section>
				<main>{mainContent}</main>
			</aside>,
		];
	}
}
