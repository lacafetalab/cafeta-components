import { Component, h, Host, Prop, State } from '@stencil/core';
import 'choices.js/public/assets/scripts/choices.min.js';
import 'choicesjs-stencil';
import { IMenuList, IUserData } from './interface';

@Component({
	tag: 'cc-profile-user',
	styleUrls: [ 'cc-profile-user.scss' ],
	shadow: false
})
export class CcProfileMenu {
	@Prop() menuList: Array<IMenuList>;
	@Prop() userData: Array<IUserData>;

	@State() isMenuOpen: boolean = false;

	private menuToggle() {
		this.isMenuOpen = !this.isMenuOpen;
	}

	render() {
		return (
			<Host>
				{this.menuList && this.menuList.length ? (
					<div class="profileuser">
						<div>
							<div
								class={{
									flex: true,
									'ml-auto': true,
									usermenu__toggle: true,
									'usermenu__toggle--active': this.isMenuOpen
								}}
							>
								<div role="menu" tabindex="0" class="usermenu__toggle-user">
									{this.userData.map((user) => (
										<div class="user__element">
											<span class="user__element-label">
												Hola, <b>{user.userName}</b>
											</span>
											<img
												class="user__element-avatar"
												alt={user.userName}
												src={user.userAvatar}
											/>
											<a class="user__element-toggle" onClick={() => this.menuToggle()}>
												<cc-icon class="user__element-icon" name="chevron-down" size={24} />
											</a>
										</div>
									))}

									<div class="usermenu__toggle-menu">
										<div class="bg-neutral-04 shadow relative overflow-hidden flex flex-col rounded-sm overflow-hidden">
											<div class="usermenu__toggle-menu-container">
												{this.menuList.map((list) => (
													<a
														href={list.urlClick}
														onClick={() => list.handleClick}
														class="px-lg text-body hover:bg-01 hover:text-neutral-03 hover:font-bold menu__element-link"
													>
														<cc-icon
															class="menu__element-icon"
															size={24}
															name={list.iconName}
														/>
														<span class="ml-sm menu__element-label">{list.labelText}</span>
													</a>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div>Cargando...</div>
				)}
			</Host>
		);
	}

	componentDidLoad() {}
}
