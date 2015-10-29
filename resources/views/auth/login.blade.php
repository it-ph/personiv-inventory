@extends('main')

@section('content')
	<md-content flex layout="column" layout-align="center center" class="full-height-min main-content">
		<a href="/">
			<img show-gt-md hide-md hide-sm src="/assets/img/Personiv-Final_white_transparent.png" alt="Personiv Logo" class="personiv-logo">
			<img show-sm show-md hide-gt-md src="/assets/img/Personiv-icon_large-white.png" alt="" class="personiv-logo">
		</a>
		<h1 class="white-text md-display-1 weight-300">Inventory System</h1>
		<br>
		<md-card>
			<md-card-content>
				<form method="POST" action="/auth/login" class="form">
					{!! csrf_field() !!}
					<!-- Email -->
					<md-input-container>
						<label>Email</label>
						<input type="email" name="email" value="{{ old('email') }}">
					</md-input-container>
					<!-- Password -->
					<md-input-container>
						<label>Password</label>
						<input type="password" name="password" value="{{ old('email') }}">
					</md-input-container>
					<!-- Remember Me -->
					<md-checkbox aria-label="remember me" name="remember" class="md-primary">Keep me logged in</md-checkbox>
				</form>
			</md-card-content>
		</md-card>
	</md-content>
@stop