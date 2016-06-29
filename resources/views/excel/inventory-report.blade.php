<table border="1">
	<tr>
		<th colspan="2" align="center">Assets</th>
	</tr>
	<tr>
		<th align="center">Brand</th>
		<th align="center">Model</th>
	</tr>
	@foreach($data->assets as $asset)
		<tr>
			<td align="center">{{ $asset->brand }}</td>	
			<td align="center">{{ $asset->model }}</td>	
		</tr>
	@endforeach
</table>
<br>
<table border="1">
	<tr>
		<th colspan="7" align="center">Asset Tags</th>
	</tr>
	<tr>
		<th align="center">Brand</th>
		<th align="center">Model</th>
		<th align="center">Property Code</th>
		<th align="center">Serial</th>
		<th align="center">Work Station</th>
		<th align="center">Computer Name</th>
		<th align="center">End of Warranty</th>
	</tr>

	@foreach($data->asset_tags as $asset_tag)
	<tr>
		<td align="center">{{$asset_tag->asset->brand}}</td>	
		<td align="center">{{$asset_tag->asset->model}}</td>	
		<td align="center">{{$asset_tag->property_code}}</td>	
		<td align="center">{{$asset_tag->serial or 'N/A'}}</td>	
		<td align="center">{{$asset_tag->work_station->name or 'N/A'}}</td>	
		<td align="center">{{$asset_tag->computer_name or 'N/A'}}</td>	
		<td align="center">{{$asset_tag->warranty_end or 'N/A'}}</td>	
	</tr>
	@endforeach
</table>