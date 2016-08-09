<table border="1">
	<tr>
		<th colspan="6" align="center">Assets</th>
	</tr>
	<tr>
		<th align="center">Brand</th>
		<th align="center">Model</th>
		<th align="center">Deployed</th>
		<th align="center">Stocks</th>
		<th align="center">Pulled Out</th>
		<th align="center">Subtotal</th>
	</tr>
	@foreach($data->assets as $asset)
		<tr>
			<td align="center">{{ $asset->brand }}</td>	
			<td align="center">{{ $asset->model }}</td>	
			<td align="center">{{ $asset->deployed }}</td>	
			<td align="center">{{ $asset->stocks }}</td>	
			<td align="center">{{ $asset->pulled_out }}</td>	
			<td align="center">{{ $asset->total }}</td>	
		</tr>
	@endforeach
	<tr>
		<th colspan="2" align="center">Total</th>
		<th align="center">{{ $data->total_deployed }}</th>
		<th align="center">{{ $data->total_stocks }}</th>
		<th align="center">{{ $data->total_pulled_out }}</th>
		<th align="center">{{ $data->overall }}</th>
	</tr>
</table>
<br>
<table border="1">
	<tr>
		<th colspan="9" align="center">Asset Tags</th>
	</tr>
	<tr>
		<th align="center">Brand</th>
		<th align="center">Model</th>
		<th align="center">Property Code</th>
		<th align="center">Serial</th>
		<th align="center">Work Station</th>
		<th align="center">Computer Name</th>
		<th align="center">Date Purchased</th>
		<th align="center">End of Warranty</th>
		<th align="center">Status</th>
	</tr>

	@foreach($data->assets as $asset)
		@foreach($asset->asset_tags as $asset_tag)
			<tr>
				<td align="center">{{$asset_tag->asset->brand}}</td>	
				<td align="center">{{$asset_tag->asset->model}}</td>	
				<td align="center">{{$asset_tag->property_code}}</td>	
				<td align="center">{{$asset_tag->serial or 'N/A'}}</td>	
				<td align="center">{{$asset_tag->work_station->name or 'N/A'}}</td>	
				<td align="center">{{$asset_tag->computer_name or 'N/A'}}</td>
				<td align="center">{{$asset_tag->purchase_order->date_purchased or 'N/A'}}</td>	
				<td align="center">{{$asset_tag->warranty_end or 'N/A'}}</td>
				<td align="center">{{$asset_tag->status or 'N/A'}}</td>
			</tr>
		@endforeach	
	@endforeach
</table>