@extends('layout')

<md-content layout="row" layout-wrap flex layout-padding>
	@foreach ($barcodes as $item)
	<div flex="25" layout="column" layout-align="center center" class="border">
		{!! DNS1D::getBarcodeHTML($item, "C128" ,1,15) !!}
		<span class="font-size-10"><strong>{{ $item }}</strong></span>
		<span class="font-size-8">Property of Personiv</span>
		<span class="font-size-8"><strong>DO NOT REMOVE STICKER</strong></span>
	</div>
	@endforeach
</md-content>